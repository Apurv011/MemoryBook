import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({isAuth: isAuth, component: Component, uID: uId, changeAuthStatus: changeAuthstatus, uName: userName,  ...rest}){
    return(
      <Route
        {...rest}
        render={(props) => {
          if(isAuth){
            return <Component uID={uId} changeAuthStatus={changeAuthstatus} uName={userName}/>;
          }
          else {
            return (
              <Redirect to={{ pathname: "/login" }} />
            );
          }
        }}
      />
    );
}

export default ProtectedRoute;
