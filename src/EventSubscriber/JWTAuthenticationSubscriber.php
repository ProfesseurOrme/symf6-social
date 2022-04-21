<?php

namespace App\EventSubscriber;

use JetBrains\PhpStorm\ArrayShape;
use Lexik\Bundle\JWTAuthenticationBundle\Event\AuthenticationSuccessEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\Security\Core\User\UserInterface;

class JWTAuthenticationSubscriber implements EventSubscriberInterface
{
    /**
     * @param AuthenticationSuccessEvent $event
     * @return void
     */
    public function onLexikJwtAuthenticationOnAuthenticationSuccess(AuthenticationSuccessEvent $event): void
    {
        $data = $event->getData();
        $user = $event->getUser();

        if (!$user instanceof UserInterface) {
            return;
        }

        $data['data'] = array(
            'user' => $user->getUsername(),
            'roles' => $user->getRoles()
        );

        $event->setData($data);
    }

    /**
     * @return string[]
     */
    #[ArrayShape(['lexik_jwt_authentication.on_authentication_success' => "string"])]
    public static function getSubscribedEvents(): array
    {
        return [
            'lexik_jwt_authentication.on_authentication_success' => 'onLexikJwtAuthenticationOnAuthenticationSuccess',
        ];
    }
}
