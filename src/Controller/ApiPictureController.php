<?php

namespace App\Controller;

use App\Entity\Picture;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class ApiPictureController extends AbstractController
{

    public function __construct(private ManagerRegistry $doctrine) {}

    public function __invoke(int $id) {
        $picture = $this->doctrine
            ->getRepository(Picture::class)
            ->find($id)
        ;

        if(!$picture) {
            throw $this->createNotFoundException("No picture found for this id");
        }

        $comments = $picture->getComments();

        if($comments->isEmpty()) {
            throw $this->createNotFoundException("No comments for this picture");
        }

        return $comments;
    }
}
