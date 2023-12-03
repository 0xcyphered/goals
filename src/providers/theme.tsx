import React from "react";
import { Theme as ThemeComponent } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

const Provider: React.FunctionComponent<{ children: React.ReactNode }> =
  function Provider({ children }) {
    return (
      <ThemeComponent
        accentColor="crimson"
        grayColor="sand"
        radius="large"
        panelBackground="solid"
        scaling="100%"
      >
        {children}
      </ThemeComponent>
    );
  };

export default Provider;
