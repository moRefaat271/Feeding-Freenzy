var fishObject = function (size = 1) {
  this.imgLeft = "";
  this.imgRight = "";
  this.Size = size;
  this.invoke = function () {
    if (size == 1) {
      fishObject.c1S1++;
      this.imgLeft = "../assets/images/Enemies/left/blueFish.gif";
      this.imgRight = "../assets/images/Enemies/right/blueFish.gif";
    } else if (size == 2) {
      fishObject.c2S2++;
      this.imgLeft = "../assets/images/Enemies/left/tuna.gif";
      this.imgRight = "../assets/images/Enemies/right/tuna.gif";
    } else if (size == 3) {
      fishObject.c3S3++;
      this.imgLeft = "../assets/images/Enemies/left/yellowFish.gif";
      this.imgRight = "../assets/images/Enemies/right/yellowFish.gif";
    } else if (size == 4) {
      fishObject.c4S4++;
      this.imgLeft = "../assets/images/Enemies/left/BOOMFish.gif";
      this.imgRight = "../assets/images/Enemies/right/BOOMFish.gif";
    } else if (size == 5) {
      fishObject.c5S5++;
      this.imgLeft = "../assets/images/Enemies/left/shark.gif";
      this.imgRight = "../assets/images/Enemies/right/shark.gif";
    }
  };
  this.invoke();
};

fishObject.c1S1 = 0;
fishObject.c2S2 = 0;
fishObject.c3S3 = 0;
fishObject.c4S4 = 0;
fishObject.c5S5 = 0;
