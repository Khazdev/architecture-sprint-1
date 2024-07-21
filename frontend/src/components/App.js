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
import { useHandleEditAvatarClick, useHandleEditProfileClick } from "../../microfrontend/profile-app/src/utils/hooks";

const AuthApp = lazy(() => import('mesto_auth/App'));
const CardApp = lazy(() => import('mesto_cards/App'));
const ProfileApp = lazy(() => import('mesto_profile/App'));

function App() {

  const context = useContext(CurrentUserContext);

  const {
    isLoggedIn,
    email,
    tooltipStatus,
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
  const handleEditAvatarClick = useHandleEditAvatarClick();
  const handleEditProfileClick = useHandleEditProfileClick();

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
        <ProfileApp/>
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
