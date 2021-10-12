import style from 'bundle-text:./component-style.css'
import WKT from 'ol/format/WKT'

const LOCATIE_SERVER_URL = 'https://geodata.nationaalgeoregister.nl/locatieserver/v3'

class LocatieServerControl extends HTMLElement {
  constructor () {
    super()
    const _style = document.createElement('style')
    const _template = document.createElement('template')
    this.query = ''
    _style.innerHTML = `
        ${style}
        #locationServerControl{
            display: flex;
            position: absolute;
            bottom: 0.5em;
            right: 0.5em;
        }
        @media only screen and (max-width: 1024px) {
          #locationServerControl{
            bottom: 3em;
            left: 0.5em;
          }
        }
      `
    _template.innerHTML = `
        <div id="locationServerControl" class="parentControl">
            <input autoComplete="off" id="lsInput" class="control" type="text" placeholder="zoek in locatieserver" title="Zoek in PDOK Locatieserver" list="locatie-auto-complete">
            <datalist id="locatie-auto-complete"></datalist>
        </div>
    `

    this.shadow = this.attachShadow({ mode: 'open' })
    this.shadow.appendChild(_style)
    this.shadow.appendChild(_template.content.cloneNode(true))

    this.shadow.getElementById('lsInput').addEventListener('input', (event) => {
      console.log(event.inputType)
      if (event.inputType === 'insertReplacementText' || event.inputType === undefined) {
        const options = this.shadow.getElementById('locatie-auto-complete').querySelectorAll('option')
        let id = ''
        for (let option of options) {
          if (option.value === event.target.value) {
            id = option.id
          }
        }
        fetch(`${LOCATIE_SERVER_URL}/lookup?id=${id}&fl=id,geometrie_ll`)
          .then((response) => {
            return response.json()
          })
          .then((data) => {
            const wktLoc = data.response.docs[0].geometrie_ll
            const format = new WKT()
            const feature = format.readFeature(wktLoc, {
              dataProjection: 'EPSG:4326',
              featureProjection: 'EPSG:3857'
            })
            const ext = feature.getGeometry().getExtent()
            this.dispatchEvent(new CustomEvent('location-selected', { bubbles: true, composed: true, detail: { extent: ext } }))
            this.shadow.getElementById('locatie-auto-complete').innerHTML = ''
            this.shadow.getElementById('lsInput').blur()
          })
      }
    })

    this.shadow.getElementById('lsInput').addEventListener('keyup', (e) => {
      if (this.query === e.target.value) {
        return
      }
      this.query = e.target.value
      fetch(`${LOCATIE_SERVER_URL}/suggest?q=${this.query}`)
        .then((response) => {
          return response.json()
        })
        .then((data) => {
          if (data.response.docs.length > 0) {
            let options = data.response.docs.map(x => `<option value="${x.weergavenaam}" id="${x.id}">`)
            let optionsHtml = options.join('')
            this.shadow.getElementById('locatie-auto-complete').innerHTML = optionsHtml
          }
        })
    })
  }
  connectedCallback () {
    this.shadow.addEventListener('keydown', (event) => {
      event.stopPropagation()
    })
  }
}

export default LocatieServerControl
