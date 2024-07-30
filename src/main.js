import { createApp } from 'vue'
import App from './App.vue'

const isMobile = () => ('ontouchstart' in document.documentElement && navigator.userAgent.match(/Mobi/)) || (navigator.userAgent.indexOf('IEMobile') !== -1);

if (isMobile()) {
    alert('Sorry, but you cannot play this game from a mobile device. It requires the use of browser devtools. Please try again from a desktop or laptop.');
    
    try {
        window.history.back();
    } catch (e) {
        
    }
} else {
    createApp(App).mount('#app')
}
