import { Component } from "react";
import { cities } from "../constants/cities";

interface Props {
  changeCity: (e: any) => void;
  currentCity: string;
}

export default class Header extends Component<Props> {
  render() {    
    return (
      <header>
        {cities.map((city: string) => {
          const cityClassName =
            city === this.props.currentCity
              ? "header header--citiesCurrent"
              : "header";
          return (
            <div
              key={city}
              className={cityClassName}
              onClick={((e: any) => this.props.changeCity(e.target.textContent))}
            >
              {city}
            </div>
          );
        })}
      </header>
    );
  }
}
