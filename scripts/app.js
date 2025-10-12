import { TemplateManager } from "./TemplateManager.js";

document.addEventListener(
    'DOMContentLoaded', function () {

        document.getElementById('add-card-btn').addEventListener(
            'click', async () => {
                const inputClone = (await TemplateManager.getClone('input-manchete')).querySelector('.input-element-manchete')
                const previewClone = (await TemplateManager.getClone('preview-manchete')).querySelector('.preview-element-manchete')

                if (!inputClone || !previewClone) return

                const tituloInput = inputClone.querySelector('.input-card-title')
                const subtituloInput = inputClone.querySelector('.input-card-subtitle')
                const botaoRemover = inputClone.querySelector('.remove-card-btn')

                const tituloPreview = previewClone.querySelector('.preview-card-title')
                const subtituloPreview = previewClone.querySelector('.preview-card-subtitle')

                tituloInput.addEventListener('input', () => tituloPreview.textContent = tituloInput.value || 'Título do Card')
                subtituloInput.addEventListener('input', () => subtituloPreview.textContent = subtituloInput.value || 'Subtítulo do Card')
                
                document.getElementById('preview-cards').appendChild(previewClone)
                document.getElementById('input-cards').appendChild(inputClone)

                botaoRemover.addEventListener(
                    'click', () => {
                        inputClone.remove()
                        previewClone.remove()
                    }
                )
            }
        ) 

        const inputTextoHeader = document.getElementById('input-texto-header')

        inputTextoHeader.addEventListener('input', () => document.getElementById('preview-texto-header').textContent = inputTextoHeader.value || 'Nome do Jornal')

        const inputUrlHeader = document.getElementById('input-url-header')

        inputUrlHeader.addEventListener('input', () => document.getElementById('preview-url-header').src = inputUrlHeader.value || '')

        const previewHeader = document.getElementById('preview-header')
        const inputBgColorHeader = document.getElementById('input-header-bg-color')
        const inputFgColorHeader = document.getElementById('input-header-fg-color')

        inputBgColorHeader.addEventListener('input', () => previewHeader.style.setProperty('--preview-bg-header-preview',inputBgColorHeader.value))
        inputFgColorHeader.addEventListener('input', () => previewHeader.style.setProperty('--preview-fg-header-preview',inputFgColorHeader.value))

        const previewManchetes = document.getElementById('preview-headlines')
        const inputUrlMain = document.getElementById('input-url-main')
        const inputUrlHeigthMain = document.getElementById('input-url-heigth-main')
        const inputBgColorMain = document.getElementById('input-bg-color-main')
        const inputFgColorMain = document.getElementById('input-fg-color-main')
        const inputBorderColorMain = document.getElementById('input-border-color-main')
        const inputBorderWidthMain = document.getElementById('input-border-width-main')
        const inputBorderWidthManchete = document.getElementById('input-border-width-manchete')
        const inputBorderColorManchete = document.getElementById('input-border-color-manchete')
        const inputBgColorMancete = document.getElementById('input-bg-color-manchete')

        inputUrlHeigthMain.addEventListener('input', () => previewManchetes.style.setProperty('--preview-url-heigth-main',inputUrlHeigthMain.value + 'px'))
        inputUrlMain.addEventListener('input', () => previewManchetes.querySelector('#preview-url-main').src = inputUrlMain.value || '')
        inputBgColorMain.addEventListener('input', () => previewManchetes.style.setProperty('--preview-bg-color-main',inputBgColorMain.value))
        inputFgColorMain.addEventListener('input', () => previewManchetes.style.setProperty('--preview-fg-color-main',inputFgColorMain.value))
        inputBorderColorMain.addEventListener('input', () => previewManchetes.style.setProperty('--preview-border-color-main',inputBorderColorMain.value))
        inputBorderWidthMain.addEventListener('input', () => previewManchetes.style.setProperty('--preview-border-width-main',inputBorderWidthMain.value + 'px'))
        inputBorderWidthManchete.addEventListener('input', () => previewManchetes.style.setProperty('--preview-border-width-manchete',inputBorderWidthManchete.value + 'px'))
        inputBorderColorManchete.addEventListener('input', () => previewManchetes.style.setProperty('--preview-border-color-manchete',inputBorderColorManchete.value))
        inputBgColorMancete.addEventListener('input', () => previewManchetes.style.setProperty('--preview-bg-color-manchete',inputBgColorMancete.value))

        const previewFooter = document.getElementById('preview-footer')
        const inputTextoFooter = document.getElementById('input-texto-footer')
        const inputBgColorFooter = document.getElementById('input-bg-color-footer')
        const inputFgColorFooter = document.getElementById('input-fg-color-footer')
        const inputFontSizeFooter = document.getElementById('input-font-size-footer')

        inputTextoFooter.addEventListener('input', () => document.getElementById('preview-texto-footer').textContent = inputTextoFooter.value || '')
        inputBgColorFooter.addEventListener('input', () => previewFooter.style.setProperty('--preview-bg-color-footer',inputBgColorFooter.value))
        inputFgColorFooter.addEventListener('input', () => previewFooter.style.setProperty('--preview-fg-color-footer',inputFgColorFooter.value))
        inputFontSizeFooter.addEventListener('input', () => previewFooter.style.setProperty('--preview-font-size-footer',inputFontSizeFooter.value + 'px'))

        const saveHtml = document.getElementById('save-html')
        const loadHtml = document.getElementById('load-html')
        const clearHtml = document.getElementById('clear-html')

        saveHtml.addEventListener(
            'click', () => {
                let conteudo_html = document.getElementById('preview').innerHTML
                let titulo_pagina = inputTextoHeader.value || 'Pagina Gerada'
                const html_completo = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${titulo_pagina}</title>
</head>
<body>
    ${conteudo_html}
</body>
</html>
        `
                localStorage.setItem('html-salvo',html_completo)
            }
        )

        loadHtml.addEventListener('click', () => document.getElementById('view-html').textContent = localStorage.getItem('html-salvo'))
        clearHtml.addEventListener(
            'click', () => {
                localStorage.removeItem('html-salvo')
                document.getElementById('view-html').textContent = ''
            }
        )
    }
)