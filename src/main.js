import './app.css';

(async function () {
    const sampleMarkdownFile = await fetch('https://raw.githubusercontent.com/FPT-NMTung/website-profile/main/docs/data.md')

    const classMap = {
        h1: 'text-primary-focus',
        h2: 'text-primary',
        ul: 'ml-6',
        li: '',
        div: '',
        p: 'base-content',
    }

    const bindings = Object.keys(classMap)
        .map(key => ({
            type: 'output',
            regex: new RegExp(`<${key}(.*)>`, 'g'),
            replace: `<${key} class="${classMap[key]}" $1>`
        }));

    const conv = new showdown.Converter({
        extensions: [...bindings]
    });

    const html = conv.makeHtml(await sampleMarkdownFile.text());

    document.getElementById('app').innerHTML = html;
})();


