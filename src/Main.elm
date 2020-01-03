module Main exposing (..)

import Browser
import Html exposing (..)
import Html.Attributes exposing (..)


init : () -> ( {}, Cmd msg )
init _ =
    ( {}, Cmd.none )


update _ _ =
    ( {}, Cmd.none )


view _ =
    div []
        [ h1 [] [ text "hello bob" ]
        ]


subscriptions _ =
    Sub.none


main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
        }
