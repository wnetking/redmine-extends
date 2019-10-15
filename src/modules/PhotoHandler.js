class PhotoHandler {
  constructor() {}

  setTemplate() {
    $('body').append(`
      <div id="photo-handler-wrap" style="display:none;">
      </div>
    `);
  }

  getImgTemplate(src) {
    return `
      <img alt="photo-handler-wrap" src="${src}" data-image-hover="${src}"/>
      <button class="link-btn close-photo-handler-wrap">x</button>
      <div id="overlay" class="zoomImage"></div>
    `;
  }

  getVideoTemplate(src) {
    return `
    <video src="${src}" autoplay controls poster="https://serpstat.com/img/serpstat_wallpaper.jpg">
      Sorry, your browser doesn't support embedded videos, 
      but don't worry, you can <a href="videofile.ogg">download it</a>
      and watch it with your favorite video player!
    </video>
    <button class="link-btn close-photo-handler-wrap">x</button>
    <div id="overlay" class="zoomImage"></div>
    `;
  }

  getTemplateByStrategy(src) {
    if (src.includes('.mp4')) {
      return this.getVideoTemplate(src);
    } else {
      return this.getImgTemplate(src);
    }
  }

  setModalTemplate(src) {
    $('#photo-handler-wrap').html(this.getTemplateByStrategy(src));
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

  getSrc = target => {
    const nodeName = target.nodeName;

    if (nodeName === 'IMG') {
      return $(target).attr('src');
    } else {
      return $(target).attr('data-src');
    }
  };

  openModal = e => {
    e.preventDefault();
    e.stopPropagation();

    const imgSrc = this.getSrc(e.target);
    this.setModalTemplate(imgSrc);
    this.show();
  };

  init() {
    this.setTemplate();
    this.element = document.getElementById('overlay');
    $(
      '[href$=".png"], [href$=".jpg"], [href$=".gif"], [href$=".jpeg"], [href$=".mp4"]'
    )
      .attr('target', '_blank')
      .each(this.setButtonTmp);

    $('body').on('click', '.in-modal-btn', this.openModal);
    $('body').on('click', 'img', this.openModal);
    $('body').on('click', '.close-photo-handler-wrap', this.hide);
  }
}

export default PhotoHandler;
