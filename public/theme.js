function initTheme() {
    var theme = sessionStorage.getItem('next-theme');
    console.log(`Init Theme: ${theme}`)
    if(theme != undefined){
        if (theme == 'darkmode') {
          document.querySelector('html').classList.add('darkmode')
        } else{
            document.querySelector('html').classList.add('lightmode')
        }
    } else{
        document.querySelector('html'.classList.add('default'))
    }
  }

initTheme();