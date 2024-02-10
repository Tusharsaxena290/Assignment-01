  // Creating Pixi App
  const app = new PIXI.Application({
    width: 1000,
    height: 600,
    backgroundColor: 0x1099bb,
  });

  // Adding Pixi canvas to html
  document.body.appendChild(app.view);

  // Load the assets
  PIXI.Loader.shared
    .add('background', 'background.png')
    .add('icon1', 'bonus.png')
    .add('icon2', 'bonus.png')
    .add('icon3', 'bonus.png')
    .add('icon4', 'bonus.png')
    .add('icon5', 'bonus.png')
    .add('icon6', 'bonus.png')
    
    .load(setup);

    function setup() {
      const background = new PIXI.Sprite(PIXI.Loader.shared.resources['background'].texture);
      app.stage.addChild(background);
  
      // Icon Data Obj
      const iconsData = [
          { textureName: 'icon1', position: [200, 200], scale: 1 },
          { textureName: 'icon2', position: [450, 200], scale: 1 },
          { textureName: 'icon3', position: [700, 200], scale: 1 },
          { textureName: 'icon4', position: [200, 350], scale: 1 },
          { textureName: 'icon5', position: [450, 350], scale: 1 },
          { textureName: 'icon6', position: [700, 350], scale: 1 },
          
      ];
  
      // Createing and position icons
      const icons = [];
      iconsData.forEach(data => {
          const icon = new PIXI.Sprite(PIXI.Loader.shared.resources[data.textureName].texture);
          icon.position.set(...data.position);
          icon.scale.set(data.scale);
          icon.anchor.set(0.5);
          icon.interactive = true;
          icon.buttonMode = true;
          icon.currentScale = 1; // Current Scale set
  
          icon.on('pointerdown', () => {
              // To toggle the scale
              icon.currentScale = icon.currentScale === 1 ? 1.3 : 1;
  
              // Scale applied
              gsap.to(icon.scale, { x: icon.currentScale, y: icon.currentScale, duration: 0.5 });
  
              if (icon.currentScale === 1) {
                  // Remove child "1" on scale back
                  const number = app.stage.getChildByName('number');
                  if (number) {
                      app.stage.removeChild(number);
                  }
              } else {
                  // Displaying child
                  const number = new PIXI.Text("1", { fontSize: 20, fill: 'white' });
                  number.anchor.set(0.5);
                  number.position.set(icon.x, icon.y);
                  number.name = 'number'; // Giving number the name to apply toggling
                  app.stage.addChild(number);
              }
          });
  
          icons.push(icon);
      });
  
      // Adding the icons to the stage
      icons.forEach(icon => app.stage.addChild(icon));
  }
  
  