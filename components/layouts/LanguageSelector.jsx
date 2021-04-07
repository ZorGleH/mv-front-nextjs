import {useRouter} from 'next/router'
// import ReactFlagsSelect from "react-flags-select";
// import "react-flags-select/css/react-flags-select.css";


const LanguageSelector = () => {
  const selectHandler = e => {
    let locale = e.toLowerCase();
    if (locale === "gb") locale = "en";
    i18n.changeLanguage(locale);
  };

  const {locale} = useRouter();
  let localeShort = locale.substring(0, 2).toUpperCase();
  if (localeShort === "EN") localeShort = "GB";

  /* return (
    <ReactFlagsSelect
      onSelect={selectHandler}
      countries={["GB", "FR", "ES", "DE", "RU"]}
      showOptionLabel={false}
      defaultCountry={localeShort}
      selectedSize={15}
      optionsSize={22}
      showSelectedLabel={false}
    />
  );*/
  return (<p>FOO</p>);
};

export default LanguageSelector;
