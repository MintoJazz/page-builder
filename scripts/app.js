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
        // const previewTextoHeader = document.getElementById('preview-texto-header')

        inputTextoHeader.addEventListener('input', () => document.getElementById('preview-texto-header').textContent = inputTextoHeader.value || 'Nome do Jornal')

        const inputUrlHeader = document.getElementById('input-url-header')
        // const previewUrlHeader = document.getElementById('preview-url-header')

        inputUrlHeader.addEventListener('input', () => document.getElementById('preview-url-header').src = inputUrlHeader.value || 'https://via.placeholder.com/150x50.png?text=Logo')

        const previewHeader = document.getElementById('preview-header')
        const inputBgColorHeader = document.getElementById('input-header-bg-color')
        const inputFgColorHeader = document.getElementById('input-header-fg-color')

        inputBgColorHeader.addEventListener('input', () => previewHeader.style.setProperty('--preview-bg-header-preview',inputBgColorHeader.value))
        inputFgColorHeader.addEventListener('input', () => previewHeader.style.setProperty('--preview-fg-header-preview',inputFgColorHeader.value))

        const previewManchetes = document.getElementById('preview-headlines')
        const inputUrlMain = document.getElementById('input-url-main')
        const inputUrlHeigthMain = document.getElementById('input-url-heigth-main')
        const inputBgColorManchetes = document.getElementById('input-bg-color-main')
        const inputFgColorManchetes = document.getElementById('input-fg-color-main')
        const inputBorderColorManchetes = document.getElementById('input-border-color-main')
        const inputBorderWidthManchetes = document.getElementById('input-border-width-main')

        inputUrlHeigthMain.addEventListener('input', () => previewManchetes.style.setProperty('--preview-url-heigth-main',inputUrlHeigthMain.value + 'px'))
        inputUrlMain.addEventListener('input', () => document.getElementById('preview-url-main').src = inputUrlMain.value || '')
        inputBgColorManchetes.addEventListener('input', () => previewManchetes.style.setProperty('--preview-bg-color-main',inputBgColorManchetes.value))
        inputFgColorManchetes.addEventListener('input', () => previewManchetes.style.setProperty('--preview-fg-color-main',inputFgColorManchetes.value))
        inputBorderColorManchetes.addEventListener('input', () => previewManchetes.style.setProperty('--preview-border-color-main',inputBorderColorManchetes.value))
        inputBorderWidthManchetes.addEventListener('input', () => previewManchetes.style.setProperty('--preview-border-width-main',inputBorderWidthManchetes.value + 'px'))
    }
)