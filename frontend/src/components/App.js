import React, { lazy, Suspense, useContext } from "react";
import { Switch } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import api from "../../shared-library/src/utils/api";
import { CurrentUserContext } from "../../shared-library/src";
import ProtectedRoute from "./ProtectedRoute";
import { useHandleAddPlaceClick, useHandleCardClick, useHandleCardDelete, useHandleCardLike } from "mesto_cards/hooks";
import { useCloseAllPopups } from "../../shared-library/src/utils/hooks";
import { useHandleSignOut } from "mesto_auth/hooks";
import InfoTooltip from "mesto_auth/InfoTooltip";

const AuthApp = lazy(() => import('mesto_auth/App'));
const CardApp = lazy(() => import('mesto_cards/App'));

function App() {

  const context = useContext(CurrentUserContext);

  const {
    isLoggedIn,
    email,
    tooltipStatus,
    isEditProfilePopupOpen,
    setIsEditProfilePopupOpen,
    isEditAvatarPopupOpen,
    setIsEditAvatarPopupOpen,
    cards,
    setCards,
    setCurrentUser,
    isInfoToolTipOpen,
  } = context;

  const handleAddPlaceClick = useHandleAddPlaceClick();
  const handleCardClick = useHandleCardClick();
  const handleCardLike = useHandleCardLike();
  const handleCardDelete = useHandleCardDelete();
  const closeAllPopups = useCloseAllPopups();
  const onSignOut = useHandleSignOut();

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([cardData, userData]) => {
        setCurrentUser(userData);
        setCards(cardData);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }


  function handleUpdateUser(userUpdate) {
    api
      .setUserInfo(userUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarUpdate) {
    api
      .setUserAvatar(avatarUpdate)
      .then((newUserData) => {
        setCurrentUser(newUserData);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="page__content">
      <Suspense fallback={<div>Loading...</div>}>
        <Header email={email} onSignOut={onSignOut}/>
        <Switch>
          {/*Роут / защищён HOC-компонентом ProtectedRoute*/}
          <ProtectedRoute
            exact
            path="/"
            component={Main}
            cards={cards}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            loggedIn={isLoggedIn}
          />
          <AuthApp/>
        </Switch>
        <Footer/>
        {/*<EditProfilePopup*/}
        {/*  isOpen={isEditProfilePopupOpen}*/}
        {/*  onUpdateUser={handleUpdateUser}*/}
        {/*  onClose={closeAllPopups}*/}
        {/*/>*/}
        {/*<EditAvatarPopup*/}
        {/*  isOpen={isEditAvatarPopupOpen}*/}
        {/*  onUpdateAvatar={handleUpdateAvatar}*/}
        {/*  onClose={closeAllPopups}*/}
        {/*/>*/}
        <InfoTooltip
          isOpen={isInfoToolTipOpen}
          onClose={closeAllPopups}
          status={tooltipStatus}
        />
        <CardApp/>
      </Suspense>
    </div>
  );
}

export default App;
