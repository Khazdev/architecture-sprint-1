import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { BrowserRouter } from "react-router-dom";
import React, { useContext } from "react";
import { useHandleUpdateAvatar, useHandleUpdateUser } from "../utils/hooks";
import { useCloseAllPopups } from "../../../../shared-library/src/utils/hooks"
import { CurrentUserContext } from "../../../../shared-library/src/Components/CurrentUserContext";

function App() {

  const context = useContext(CurrentUserContext);
  const {isEditProfilePopupOpen, isEditAvatarPopupOpen} = context;
  const handleUpdateAvatar = useHandleUpdateAvatar();
  const closeAllPopups = useCloseAllPopups();
  const handleUpdateUser = useHandleUpdateUser();

  return (
    // В компонент App внедрён контекст через CurrentUserContext.Provider
    <BrowserRouter>
      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onUpdateUser={handleUpdateUser}
        onClose={closeAllPopups}
      />
      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        onUpdateAvatar={handleUpdateAvatar}
        onClose={closeAllPopups}
      />
    </BrowserRouter>
  );
}

export default App;
