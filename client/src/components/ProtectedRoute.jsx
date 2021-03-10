import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({isAuth: isauth, component: Component, uID: uId, changeAuthStatus: changeAuthstatus, uName: userName,  ...rest}){
    return(
      <Route
        {...rest}
        render={(props) => {
          if(isauth){
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
