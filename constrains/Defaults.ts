import Settings from "./Settings";

let tintColor = '#2f95dc';
let background = "#F6F6F6";
let text = "#404040";
let title = '#000';
let blockBackground = '#fff';
let main = "#5B74F9";
let lightMain = "#EAEDFF";

if(Settings.user_info.dark_mode == 1)
{
  tintColor = '#fff';
  text = "#fff";
  title = '#fff';
  blockBackground = '#1d1d1d';
  background = "#111111";
  main = "#191919";
  lightMain = "#111111";
}

export default {
  pallete: {
    title: title,
    text: text,
    background: background,
    blockBackground: blockBackground,
    main: main,
    lightMain: lightMain,
    tint: tintColor,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColor,
  },
  text:{
    fontFamily: "Avenir"
  },
};
