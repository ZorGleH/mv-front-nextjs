/* eslint react/prop-types: 0 */
import {useState} from "react";
import {Collapse, Navbar, NavbarToggler, Nav, NavItem} from "reactstrap";
import Link from "next/link";
import {useTranslation} from 'next-i18next'
import logo from "@styles/logos/logo-color.svg";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRocket} from "@fortawesome/free-solid-svg-icons";
import LanguageSelector from "./LanguageSelector";


const Header = () => {
  const [isOpen, setOpen] = useState(false)

  const toggle = () => setOpen(!isOpen);

  const {t} = useTranslation()
  return (
    <header>
      <Navbar color="light" light expand="md">
        <Link href="/" className="navbar-brand">
          <div className="d-flex flex-row">
            <div className="align-self-center">
              <img src={logo} alt="logo" height="32" />
            </div>
            <div className="align-self-center ml-2">
              <div className="logo-text">
                <h1>
                  {t("Voting platform")}
                  <small>{t("Majority Judgment")}</small>
                </h1>
              </div>
            </div>
          </div>
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <Link className="text-primary nav-link" href="/new/">
                <div> <FontAwesomeIcon icon={faRocket} className="mr-2" />
                  {t("Start an election")}
                </div>
              </Link>
            </NavItem>
            <NavItem style={{width: "150px"}}>
              <LanguageSelector />
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
}

export default Header;
