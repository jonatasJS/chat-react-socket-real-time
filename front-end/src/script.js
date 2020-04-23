console.log('inicio');

let progress = document.getElementById('progressbar');

console.log('1');

console.log(progress);

let height = document.getElementById('list');

console.log('2');

console.log(height);

let totalHeight = height.scrollHeight - window.innerHeigth;

console.log('1');

console.log(totalHeight);

window.onscroll = () => {
    let progressHeight = (window.pageYOffset / totalHeight) * 100;

    console.log('scroll inicio');

    progress.style.heigth = progressHeight + '%';

    console.log('scroll fim');
}
console.log('fim');