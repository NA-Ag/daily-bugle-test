document.addEventListener('DOMContentLoaded', () => {
    const toggleEnBtn = document.getElementById('toggle-en');
    const toggleEsBtn = document.getElementById('toggle-es');
    let currentLanguage = 'en';

    // Load initial content
    loadLanguage(currentLanguage);

    // Add event listeners for language toggle buttons
    toggleEnBtn.addEventListener('click', () => {
        if (currentLanguage !== 'en') {
            currentLanguage = 'en';
            updateActiveButton();
            loadLanguage(currentLanguage);
        }
    });

    toggleEsBtn.addEventListener('click', () => {
        if (currentLanguage !== 'es') {
            currentLanguage = 'es';
            updateActiveButton();
            loadLanguage(currentLanguage);
        }
    });

    function updateActiveButton() {
        toggleEnBtn.classList.toggle('active', currentLanguage === 'en');
        toggleEsBtn.classList.toggle('active', currentLanguage === 'es');
    }

    function loadLanguage(language) {
        fetch(`locales/${language}.json`)
            .then(response => response.json())
            .then(data => {
                // Update header content
                document.querySelector('.newspaper-title').textContent = data.header.title;
                document.getElementById('header-subtitle').textContent = data.header.subtitle;
                document.getElementById('breaking-banner').textContent = data.header.breaking;
                document.getElementById('date-display').textContent = data.header.date;

                // Update article content
                document.getElementById('article-headline').textContent = data.article.headline;
                document.getElementById('article-subheadline').textContent = data.article.subheadline;
                document.getElementById('article-byline').textContent = data.article.byline;
                document.getElementById('article-date').textContent = data.article.date;
                document.getElementById('lead-paragraph').textContent = data.article.leadParagraph;

                // Update article body paragraphs (preserve videos)
                const articleBody = document.getElementById('article-body');
                const paragraphs = articleBody.querySelectorAll('p:not(.closing-statement)');
                const closingStatement = articleBody.querySelector('.closing-statement');
                
                // Update existing paragraphs
                data.article.body.forEach((paragraphText, index) => {
                    if (paragraphs[index]) {
                        paragraphs[index].textContent = paragraphText;
                    }
                });

                // Update closing statement
                if (closingStatement) {
                    closingStatement.textContent = data.article.closingStatement;
                }

                // Update editor note
                document.getElementById('editor-note').textContent = data.article.editorNote;

                // Update footer
                document.getElementById('footer-text').textContent = data.footer;

                // Update video captions if they exist
                if (data.article.videos) {
                    const videoCaptions = [
                        document.getElementById('video-caption-1'),
                        document.getElementById('video-caption-2'),
                        document.getElementById('video-caption-3'),
                        document.getElementById('video-caption-4')
                    ];
                    
                    if (videoCaptions[0]) videoCaptions[0].textContent = data.article.videos.caption1;
                    if (videoCaptions[1]) videoCaptions[1].textContent = data.article.videos.caption2;
                    if (videoCaptions[2]) videoCaptions[2].textContent = data.article.videos.caption3;
                    if (videoCaptions[3]) videoCaptions[3].textContent = data.article.videos.caption4;
                }

                // Update page language attribute
                document.documentElement.lang = language;
            })
            .catch(error => console.error('Error loading language file:', error));
    }

    // Initialize button states
    updateActiveButton();
});