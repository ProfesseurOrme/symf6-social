<?php

namespace App\EventSubscriber;

use JetBrains\PhpStorm\ArrayShape;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTExpiredEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTFailureEventInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTInvalidEvent;
use Lexik\Bundle\JWTAuthenticationBundle\Event\JWTNotFoundEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use function Symfony\Component\HttpFoundation\Response;

class JWTErrorSubscriber implements EventSubscriberInterface
{
    /**
     * @return string[]
     */
    #[ArrayShape([
        'lexik_jwt_authentication.on_jwt_invalid' => "string",
        'lexik_jwt_authentication.on_jwt_not_found' => "string",
        'lexik_jwt_authentication.on_jwt_expired' => "string"]
    )]
    public static function getSubscribedEvents(): array
    {
        return [
            'lexik_jwt_authentication.on_jwt_invalid' => 'onLexikJwtAuthenticationOnJwtInvalid',
            'lexik_jwt_authentication.on_jwt_not_found' => 'onLexikJwtAuthenticationOnJwtNotFound',
            'lexik_jwt_authentication.on_jwt_expired' => 'onLexikJwtAuthenticationOnJwtExpired'
        ];
    }

    /**
     * @param JWTExpiredEvent $event
     * @return void
     */
    public function onLexikJwtAuthenticationOnJwtExpired(JWTExpiredEvent $event): void
    {
        $failureEventResponse = $this->getResponseOnJWTFailure($event);

        $event->setResponse($failureEventResponse);
    }

    /**
     * @param JWTInvalidEvent $event
     * @return void
     */
    public function onLexikJwtAuthenticationOnJwtInvalid(JWTInvalidEvent $event): void
    {
        $failureEventResponse = $this->getResponseOnJWTFailure($event);

        $event->setResponse($failureEventResponse);
    }

    /**
     * @param JWTNotFoundEvent $event
     * @return void
     */
    public function onLexikJwtAuthenticationOnJwtNotFound(JWTNotFoundEvent $event): void
    {
        $failureEventResponse = $this->getResponseOnJWTFailure($event);

        $event->setResponse($failureEventResponse);
    }

    /**
     * @param JWTFailureEventInterface $event
     * @return JsonResponse
     */
    private function getResponseOnJWTFailure(JWTFailureEventInterface $event): JsonResponse
    {

        $failureEventResponse = $event->getResponse();

        return new JsonResponse(
            [
                "status" => $failureEventResponse->getStatusCode(),
                "message" => $failureEventResponse->getContent()
            ],
            $failureEventResponse->getStatusCode()
        );
    }
}
