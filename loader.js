document.addEventListener('DOMContentLoaded', function() {
                 const loader = document.querySelector('.loader');
                 
                 // Simulate loading
                 setTimeout(() => {
                     loader.style.opacity = '0';
                     setTimeout(() => {
                         loader.style.display = 'none';
                         document.body.style.overflow = 'auto'; // Enable scrolling after loader
                     }, 500); // Match this with the transition duration
                 }, 2500); // Total loader display time
                 
                 // In a real implementation, you might want to wait for all assets to load
                 // window.addEventListener('load', function() {
                 //     loader.style.opacity = '0';
                 //     setTimeout(() => {
                 //         loader.style.display = 'none';
                 //         document.body.style.overflow = 'auto';
                 //     }, 500);
                 // });
             });