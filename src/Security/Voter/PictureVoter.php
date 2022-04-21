<?php

namespace App\Security\Voter;

use App\Entity\Picture;
use Symfony\Component\HttpFoundation\Exception\JsonException;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;
use Symfony\Component\Security\Core\User\UserInterface;

class PictureVoter extends Voter
{
    const PICTURE_CREATE = "PICTURE_CREATE";
    const PICTURE_EDIT = "PICTURE_EDIT";
    const PICTURE_DELETE = "PICTURE_DELETE";

    protected function supports($attribute, $subject): bool
    {
        $supportsAttribute = in_array($attribute, [self::PICTURE_CREATE, self::PICTURE_EDIT, self::PICTURE_DELETE]);
        $supportsSubject = $subject instanceof Picture;

        return $supportsAttribute && $supportsSubject;
    }


    protected function voteOnAttribute(string $attribute, $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof UserInterface) {
            return false;
        }

        if (!$subject instanceof Picture) {
            return false;
        }

        switch ($attribute) {
            case 'PICTURE_CREATE':
                return $this->canPost($user);
                break;
            case 'PiCTURE_EDIT':
                return $this->canEdit($user, $subject);
                break;
            case 'PiCTURE_DELETE':
                return $this->canDelete($user, $subject);
                break;
        }

        return false;
    }

    /**
     * @param UserInterface $user
     * @param Picture $picture
     * @return bool
     */
    public function canEdit(UserInterface $user, Picture $picture): bool
    {
        if ($user->getUsername() === $picture->getUser()->getUsername()) {
            return true;
        }
        throw new JsonException("You don't have rights to do that. Please try again !", Response::HTTP_FORBIDDEN);
    }

    /**
     * @param UserInterface $user
     * @return bool
     */
    public function canPost(UserInterface $user): bool
    {
        if (in_array('ROLE_USER', $user->getRoles())) {
            return true;
        }
        throw new JsonException("You don't have rights to do that. Please try again !", Response::HTTP_FORBIDDEN);
    }

    /**
     * @param UserInterface $user
     * @param Picture $picture
     * @return bool
     */
    public function canDelete(UserInterface $user, Picture $picture): bool
    {
        if (in_array('ROLE_ADMIN', $user->getRoles()) || $user->getUsername() === $picture->getUser()->getUsername()) {
            return true;
        }
        throw new JsonException("You don't have rights to do that. Please try again !", Response::HTTP_FORBIDDEN);
    }
}
