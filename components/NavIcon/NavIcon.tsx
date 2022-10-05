import styles from "../Navbar/Navbar.module.css";
import { useRecoilState } from "recoil";
import { currentMode } from "@/atoms/pinsAtom";

interface IProps {
  tooltip: string;
  style: string;
  mode: string;
}

const NavIcon = ({ tooltip, style, mode }: IProps) => {
  const [mapMode, setMapMode] = useRecoilState(currentMode);

  const changeHandler = () => {
    setMapMode(mode);
  };

  return (
    <div className={styles.tooltip} data-text={tooltip}>
      <input
        type="radio"
        id={mode}
        className={styles.nav__container}
        onChange={changeHandler}
        name="navbar"
        checked={mapMode === mode ? true : false}
      />
      <label htmlFor={mode} className={style}></label>
    </div>
  );
};

export default NavIcon;
