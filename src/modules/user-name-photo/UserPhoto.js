class UserPhoto {
  constructor(selector) {
    this.$selector = selector;
  }

  get userName() {
    return this.$selector
      .text()
      .toLowerCase()
      .trim();
  }

  get imgUrl() {
    return `https://projects.aks.od.ua/images/site_1/foto/${this.userName}.jpg`;
  }

  get position() {
    const x = this.$selector.offset();

    return {
      top: x.top + 20,
      left: x.left
    };
  }

  show() {
    $('#user-photo-wrap')
      .css({
        display: 'block',
        ...this.position
      })
      .find('img')
      .attr('src', this.imgUrl);
  }

  static hide() {
    $('#user-photo-wrap').css({
      display: 'none'
    });
  }

  static setTemplate() {
    $('body').append(`
      <div id="user-photo-wrap" style="position:absolute; display:none;border:2px solid #ccc;z-index:10;">
        <img alt="user photo" src="" style="max-width:100px;display:block;"/>
      </div>
    `);
  }

  static init(selector) {
    UserPhoto.setTemplate();

    $(selector).hover(
      function() {
        const userPhoto = new UserPhoto($(this));

        userPhoto.show();
      },
      () => {
        UserPhoto.hide();
      }
    );
  }
}

export default UserPhoto;
