import { CurrentUserContext } from "../../../../shared-library/src/Components/CurrentUserContext";
import { useContext } from "react";
import history from "../../../../shared-library/src/utils/history"

export function useHandleSignOut() {
  const context = useContext(CurrentUserContext);
  const {setIsLoggedIn} = context;
  // при вызове обработчика onSignOut происходит удаление jwt
  localStorage.removeItem("jwt");
  setIsLoggedIn(false);
  // После успешного вызова обработчика onSignOut происходит редирект на /signin
  history.push("/signin");
}
