import { orange } from "@mui/material/colors"

export const themeSettings = (mode) => {
  return {
    palette:{
      mode: mode,       // need to use spread operator depsnrds on the mode
      primary:{
        main: "#ADD8E6",
        light: "skyblue"
      },
      secondary:{
        main: '#15c630',
      },
      otherColor:{
        main:"#999"
      }
    },
    
  }
}
