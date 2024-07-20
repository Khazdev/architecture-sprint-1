import { CurrentUserContext } from "../Components/CurrentUserContext";
import { useContext } from "react";

export function useCloseAllPopups() {
  const context = useContext(CurrentUserContext);
  const {
    setIsEditProfilePopupOpen,
    setIsAddPlacePopupOpen,
    setIsEditAvatarPopupOpen,
    setIsInfoToolTipOpen,
    setSelectedCard
  } = context;
  
  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsInfoToolTipOpen(false);
    setSelectedCard(null);
  };
  return closeAllPopups();

}
