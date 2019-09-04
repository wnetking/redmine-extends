class PhotoHandler {
  constructor() {}

  setTemplate() {
    $('body').append(`
      <div id="photo-handler-wrap" style="display:none;">
        <img alt="photo-handler-wrap" src="" data-image-hover=""/>
        <button class="link-btn close-photo-handler-wrap">x</button>
        <div id="overlay" class="zoomImage"></div>
      </div>
    `);
  }

  setImgSrc(src) {
    $('#photo-handler-wrap img')
      .attr('src', src)
      .attr('data-image-hover', src);
  }

  show() {
    $('#photo-handler-wrap').css({
      display: 'flex'
    });
  }

  hide() {
    $('#photo-handler-wrap').css({
      display: 'none'
    });
  }

  getButtonTpl(src) {
    return `<button class="link-btn in-modal-btn icon icon-zoom-in" data-src="${src}"></button>`;
  }

  hoverImage(event) {
    this.element = document.getElementById('overlay');
    const posX = event.offsetX ? event.offsetX : event.pageX - this.offsetLeft;
    const posY = event.offsetY ? event.offsetY : event.pageY - this.offsetTop;
    this.element.style.backgroundImage = "url('" + this.src + "')";
    this.element.style.backgroundPosition =
      -posX * 4 + 'px ' + -posY * 4 + 'px';
    // this.element.style.left = this.width + 100 + 'px';
    // this.element.style.top = this.offsetTop + 'px';
    this.element.style.display = 'block';
  }

  mouseOut() {
    this.element = document.getElementById('overlay');
    this.element.style.display = 'none';
  }

  setButtonTmp = (index, element) => {
    const $item = $(element);
    const src = $item.attr('href');
    $item.append(this.getButtonTpl(src));
  };

  openModalWithImg = e => {
    e.preventDefault();
    e.stopPropagation();

    const imgSrc = $(e.target).attr('data-src');
    this.setImgSrc(imgSrc);
    this.show();
  };

  init() {
    this.setTemplate();
    this.element = document.getElementById('overlay');
    $('[href$=".png"]')
      .attr('target', '_blank')
      .each(this.setButtonTmp);

    $('body').on('click', '.in-modal-btn', this.openModalWithImg);
    $('body').on('click', '.close-photo-handler-wrap', this.hide);

    // document.body.addEventListener('mousemove', e => {
    //   if (e.target.getAttribute('data-image-hover') === null) return;
    //   this.hoverImage.apply(e.target, [e]);
    // });

    // document.body.addEventListener('mouseout', e => {
    //   if (e.target.getAttribute('data-image-hover') === null) return;
    //   this.mouseOut.apply(e.target, [e]);
    // });
  }
}

export default PhotoHandler;
