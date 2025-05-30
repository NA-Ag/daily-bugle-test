// Main JavaScript file for Daily Bugle
// Additional functionality can be added here

document.addEventListener('DOMContentLoaded', function() {
    // Add some dynamic effects to enhance the newspaper experience
    
    // Add typewriter effect to the breaking news banner
    const breakingBanner = document.getElementById('breaking-banner');
    if (breakingBanner) {
        breakingBanner.style.animation = 'pulse 2s infinite';
    }

    // Add hover effects to article sections
    const articleSections = document.querySelectorAll('.article-content p');
    articleSections.forEach(section => {
        section.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#f9f9f9';
            this.style.transition = 'background-color 0.3s ease';
        });
        
        section.addEventListener('mouseleave', function() {
            this.style.backgroundColor = 'transparent';
        });
    });

    // Add a subtle animation to the headline
    const headline = document.getElementById('article-headline');
    if (headline) {
        headline.style.animation = 'fadeInDown 1s ease-out';
    }

    // Console log for J. Jonah Jameson easter egg
    console.log('🕷️ THE DAILY BUGLE 🕷️');
    console.log('Spider-Man is a MENACE!');
    console.log('- J. Jonah Jameson, Editor-in-Chief');
});

// Add CSS animations dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInDown {
        from {
            opacity: 0;
            transform: translateY(-30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);