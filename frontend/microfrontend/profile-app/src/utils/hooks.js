import { CurrentUserContext } from "../../../../shared-library/src/Components/CurrentUserContext";
import { useContext } from "react";
import { useCloseAllPopups } from "../../../../shared-library/src/utils/hooks"
import api from "../../../../shared-library/src/utils/api";

export function useHandleEditProfileClick() {
  const context = useContext(CurrentUserContext);
  const {setIsEditProfilePopupOpen} = context;
  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  }
  return handleEditProfileClick();
}

export function useHandleEditAvatarClick() {
  const context = useContext(CurrentUserContext);
  const {setIsEditAvatarPopupOpen} = context;
  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  }
  return handleEditAvatarClick();
}

export function useHandleUpdateUser(userUpdate) {
  const context = useContext(CurrentUserContext);
  const {setCurrentUser} = context;
  const closeAllPopups = useCloseAllPopups();
  const handleUpdateUser = () => {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }
  return handleUpdateUser();
}

export function useHandleUpdateAvatar(avatarUpdate) {
  const context = useContext(CurrentUserContext);
  const {setCurrentUser} = context;
  const closeAllPopups = useCloseAllPopups();

  api
    .setUserAvatar(avatarUpdate)
    .then((newUserData) => {
      setCurrentUser(newUserData);
      closeAllPopups();
    })
    .catch((err) => console.log(err));
}
