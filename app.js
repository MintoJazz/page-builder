document.addEventListener(
    'DOMContentLoaded', function() {
        // Elementos da área de visualização
        const journalSection = document.getElementById('journal-section-preview');
        const previewImage = document.getElementById('preview-image');
        const cardContainerPreview = document.getElementById('card-container-preview');

        // Controles do editor
        const sectionBgColor = document.getElementById('section-bg-color');
        const sectionBgColorText = document.getElementById('section-bg-color-text');
        const sectionBorderWidth = document.getElementById('section-border-width');
        const sectionBorderColor = document.getElementById('section-border-color');
        const sectionBorderColorText = document.getElementById('section-border-color-text');
        
        const imageUrl = document.getElementById('image-url');
        const imageHeight = document.getElementById('image-height');

        const cardBgColor = document.getElementById('card-bg-color');
        const cardBgColorText = document.getElementById('card-bg-color-text');
        const cardBorderWidth = document.getElementById('card-border-width');
        const cardBorderColor = document.getElementById('card-border-color');
        const cardBorderColorText = document.getElementById('card-border-color-text');
        const cardBorderRadius = document.getElementById('card-border-radius');

        const titleColor = document.getElementById('title-color');
        const titleColorText = document.getElementById('title-color-text');
        const titleFontSize = document.getElementById('title-font-size');
        const titleFontWeight = document.getElementById('title-font-weight');

        const subtitleColor = document.getElementById('subtitle-color');
        const subtitleColorText = document.getElementById('subtitle-color-text');
        const subtitleFontSize = document.getElementById('subtitle-font-size');
        
        const addCardBtn = document.getElementById('add-card-btn');
        const cardEditorsContainer = document.getElementById('card-editors-container');
        
        let cardIdCounter = 0;

        // --- FUNÇÕES AUXILIARES ---
        
        // Sincroniza input de cor com o input de texto
        function syncColorInputs(colorPicker, textInput) {
            colorPicker.addEventListener('input', () => textInput.value = colorPicker.value);
            textInput.addEventListener(
                'input', () => {
                    if (/^#[0-9A-F]{6}$/i.test(textInput.value)) {
                        colorPicker.value = textInput.value;
                        colorPicker.dispatchEvent(new Event('input')); // Dispara o evento para atualizar a visualização
                    }
                }
            );
        }

        // Aplica estilos a todos os cards
        function applyGlobalCardStyles() {
            const cards = document.querySelectorAll('.headline-card');
            cards.forEach(
                card => {
                    card.style.backgroundColor = cardBgColor.value;
                    card.style.borderWidth = `${cardBorderWidth.value}px`;
                    card.style.borderColor = cardBorderColor.value;
                    card.style.borderRadius = `${cardBorderRadius.value}px`;
                }
            );
        }

        // Aplica estilos a todos os textos dos cards
        function applyGlobalTextStyles() {
            const titles = document.querySelectorAll('.headline-card h3');
            const subtitles = document.querySelectorAll('.headline-card p');

            titles.forEach(
                title => {
                    title.style.color = titleColor.value;
                    title.style.fontSize = `${titleFontSize.value}rem`;
                    title.style.fontWeight = titleFontWeight.value;
                }
            );

            subtitles.forEach(
                subtitle => {
                    subtitle.style.color = subtitleColor.value;
                    subtitle.style.fontSize = `${subtitleFontSize.value}rem`;
                }
            );
        }

        // --- EVENT LISTENERS PARA ESTILOS GERAIS ---
        
        // Seção Principal
        sectionBgColor.addEventListener('input', () => journalSection.style.backgroundColor = sectionBgColor.value);
        sectionBorderWidth.addEventListener('input', () => journalSection.style.borderWidth = `${sectionBorderWidth.value}px`);
        sectionBorderColor.addEventListener('input', () => journalSection.style.borderColor = sectionBorderColor.value);
        
        // Imagem
        imageUrl.addEventListener('input', () => previewImage.src = imageUrl.value);
        imageHeight.addEventListener('input', () => previewImage.style.height = `${imageHeight.value}px`);

        // Estilos Globais dos Cards
        cardBgColor.addEventListener('input', applyGlobalCardStyles);
        cardBorderWidth.addEventListener('input', applyGlobalCardStyles);
        cardBorderColor.addEventListener('input', applyGlobalCardStyles);
        cardBorderRadius.addEventListener('input', applyGlobalCardStyles);

        // Estilos Globais de Texto
        titleColor.addEventListener('input', applyGlobalTextStyles);
        titleFontSize.addEventListener('input', applyGlobalTextStyles);
        titleFontWeight.addEventListener('input', applyGlobalTextStyles);
        subtitleColor.addEventListener('input', applyGlobalTextStyles);
        subtitleFontSize.addEventListener('input', applyGlobalTextStyles);
        
        // Sincronizar inputs de cor
        syncColorInputs(sectionBgColor, sectionBgColorText);
        syncColorInputs(sectionBorderColor, sectionBorderColorText);
        syncColorInputs(cardBgColor, cardBgColorText);
        syncColorInputs(cardBorderColor, cardBorderColorText);
        syncColorInputs(titleColor, titleColorText);
        syncColorInputs(subtitleColor, subtitleColorText);


        // --- LÓGICA PARA ADICIONAR/REMOVER CARDS ---

        function createNewCard() {
            cardIdCounter++;
            const cardId = `card-${cardIdCounter}`;

            // 1. Criar o card na visualização
            const cardPreview = document.createElement('div');
            cardPreview.classList.add('headline-card');
            cardPreview.id = cardId;
            cardPreview.innerHTML = `
                <h3 data-target="title">Nova Manchete ${cardIdCounter}</h3>
                <p data-target="subtitle">Este é o subtítulo da nova manchete. Edite no painel ao lado.</p>
            `;
            cardContainerPreview.appendChild(cardPreview);

            // 2. Criar o editor para o card
            const cardEditor = document.createElement('div');
            cardEditor.classList.add('card-editor-item');
            cardEditor.dataset.editorFor = cardId;
            cardEditor.innerHTML = `
                <h5>Manchete ${cardIdCounter}</h5>
                <div class="form-group">
                    <label for="title-${cardId}">Título</label>
                    <input type="text" id="title-${cardId}" class="form-control" value="Nova Manchete ${cardIdCounter}">
                </div>
                <div class="form-group">
                    <label for="subtitle-${cardId}">Subtítulo</label>
                    <textarea id="subtitle-${cardId}" class="form-control" rows="2">Este é o subtítulo da nova manchete. Edite no painel ao lado.</textarea>
                </div>
                <button class="btn btn-sm btn-danger remove-card-btn">Remover</button>
            `;
            cardEditorsContainer.appendChild(cardEditor);
            
            // 3. Adicionar listeners para o novo card
            const titleInput = cardEditor.querySelector(`#title-${cardId}`);
            const subtitleInput = cardEditor.querySelector(`#subtitle-${cardId}`);
            const removeBtn = cardEditor.querySelector('.remove-card-btn');

            const targetCard = document.getElementById(cardId);
            const targetTitle = targetCard.querySelector('[data-target="title"]');
            const targetSubtitle = targetCard.querySelector('[data-target="subtitle"]');

            titleInput.addEventListener(
                'input', () => {
                    targetTitle.textContent = titleInput.value;
                }
            );
            
            subtitleInput.addEventListener(
                'input', () => {
                    targetSubtitle.textContent = subtitleInput.value;
                }
            );
            
            removeBtn.addEventListener(
                'click', () => {
                    targetCard.remove();
                    cardEditor.remove();
                }
            );
            
            // 4. Aplicar estilos globais ao novo card
            applyGlobalCardStyles();
            applyGlobalTextStyles();
        }

        addCardBtn.addEventListener('click', createNewCard);

        // Inicializar com 2 cards de exemplo
        createNewCard();
        createNewCard();
    }
);