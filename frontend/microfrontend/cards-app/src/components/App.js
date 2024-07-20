import React, { useContext } from "react";
import AddPlacePopup from "./AddPlacePopup";
import { BrowserRouter } from "react-router-dom";
import { CurrentUserContext } from "../../../../shared-library/src/Components/CurrentUserContext"
import ImagePopup from "./ImagePopup";
import { useHandleAddPlaceSubmit } from "../utils/hooks";
import { useCloseAllPopups } from "../../../../shared-library/src/utils/hooks"
import PopupWithForm from "../../../../shared-library/src/Components/PopupWithForm"

const App = () => {

  const context = useContext(CurrentUserContext);
  const {
    isAddPlacePopupOpen,
    selectedCard,
  } = context;

  const closeAllPopups = useCloseAllPopups();
  const handleAddPlaceSubmit = useHandleAddPlaceSubmit();

  return (
    <BrowserRouter>
      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        onAddPlace={handleAddPlaceSubmit}
        onClose={closeAllPopups}
      />
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да"/>
      <ImagePopup card={selectedCard} onClose={closeAllPopups}/>
    </BrowserRouter>

  )
}

export default App;
