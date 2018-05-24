$(document).ready(() => {
  $('#myd-fullpage').fullpage({
    navigation: true,
    autoScrolling: false,
    anchors: ['firstPage', 'secondPage', 'thirdPage', 'fourthPage']
  });

  $('.myd-boxed').each(function (index) {
    $(this).css({
      top: $(this).attr('data-myd-y') + 'px',
      left: $(this).attr('data-myd-x') + 'px'
    });
  })


  // FUNSI TEXT TYPING
  var typed = new Typed('#myd-typing-first', {
    strings: ["Healty isn't a goal", "It's a way of living"],
    smartBackspace: true,
    showCursor: false,
    typeSpeed: 40,
    backSpeed: 20,
  });
  
  var sceneFirst = document.getElementById('scene-first');
  var parallaxInstance = new Parallax(sceneFirst, {
    relativeInput: true,
    selector: '.layer-scene',
    pointerEvents: 'all'
  });

  var sceneSecond = document.getElementById('scene-second');
  var parallaxInstance = new Parallax(sceneSecond, {
    relativeInput: true,
    selector: '.layer-scene',
    pointerEvents: 'all'
  });
});

Vue.use(VeeValidate);
new Vue({
  el: '#app',
  data() {
    return {
      inputEmpty: false,
      loader: false,
      errorStatus: false,
      dataForm: {
        Pregnancies: 0,
        Age: 12,
        BMI: 2,
        BloodPressure: 90,
        DiabetesPredigreeFunction: 2,
        Glucose: 0,
        Insulin: 0,
        SkinThickness: 0
      },
      result: null,
      initForm: {
        Pregnancies: null,
        Age: null,
        BMI: null,
        BloodPressure: null,
        DiabetesPredigreeFunction: null,
        Glucose: null,
        Insulin: null,
        SkinThickness: null
      },
    }
  },
  methods: {
    calcDiabetes(url, payload) {
      return new Promise((resolve, reject) => {
        return axios({
          method: 'post',
          url,
          params: payload
        }).then(res => {
          if (res.status === 200) {
            resolve(res);
          }
        }).catch(err => {
          const errData = Object.assign({}, err)
          reject(errData.response);
        });
      });
    },
    submit() {
      this.$validator.validateAll()
      .then(result => {
        if (result) {
          this.inputEmpty = false
          this.errorStatus = false
          this.loader = true
          this.calcDiabetes('http://diabetes-models.herokuapp.com/input/task', this.dataForm)
            .then(res => {
              if (res) {
                this.loader = false
                this.result = res.data.result
              }
            }).catch(err => {
              this.loader = false
              this.errorStatus = true
            });
        } else {
          this.inputEmpty = true
        }
      })
    },
    resetForm() {
      this.result = null
      this.dataForm = Object.assign({}, this.initForm)
    }
  }
});
