export const TemplateManager = {
    _url: './templates.html',
    _index: null,
    async loadTemplates() {
        if (!this._index) this._index = (new DOMParser).parseFromString((await (await fetch(this._url)).text()),'text/html')
        return this._index
    },
    async getClone(id) {
        try {
            return await document.importNode((await this.loadTemplates()).getElementById(id).content,true)
        } catch (error) { 
            console.error('erro', error)
        }
    }
}