<?php

namespace App\Fixtures;

use App\Entity\Comment;
use App\Entity\Like;
use App\Entity\Picture;
use App\Entity\Tag;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Faker;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $encoder;

    public function __construct(UserPasswordHasherInterface $encoder) {
        $this->encoder = $encoder;
    }

    private function hashThisPassword(User $user, string $password ) {
        return $this->encoder->hashPassword(
            $user,
            $password
        );
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Faker\Factory::create('fr_FR');
        $user = new User();

        $user->setUsername("SuperAdmin")
            ->setEmail($faker->email())
            ->setRoles(["ROLE_ADMIN", "ROLE_USER"])
            ->setCreated($faker->dateTime())
        ;

        $hashPasswordUser =  $this->hashThisPassword($user, "admin123456");
        $user->setPassword($hashPasswordUser);

        $user2 = new User();
        $user2->setUsername("UserLambda")
            ->setEmail($faker->email())
            ->setRoles(["ROLE_USER"])
            ->setCreated($faker->dateTime())
        ;
        $hashPasswordUser2 = $this->hashThisPassword($user2, "user123456");
        $user2->setPassword($hashPasswordUser2);

        $otherUsers = [];

        for($l = 0; $l <= 30; $l++) {
            $otherUser= new User();
            $otherUser->setUsername($faker->userName())
                ->setEmail($faker->email())
                ->setRoles(["ROLE_USER"])
                ->setCreated($faker->dateTime())
            ;

            $hashPasswordOtherUser = $this->hashThisPassword($otherUser, "user123456");
            $otherUser->setPassword($hashPasswordOtherUser);
            $otherUsers[] = $otherUser;
        }

        $users = [$user, $user2, ...$otherUsers];
        $i = 1;
        while ($i <= 22) {
            $picture = new Picture();
            $picture->setImage($faker->imageUrl(640, 480, 'animals', true))
                ->setDescription($faker->realTextBetween($minNbChars = 160, $maxNbChars = 400, $indexSize = 2))
            ;

            for ($j = 1; $j <= random_int(3, 15); $j++) {
                $tag = new Tag();
                $tag->setName(ucfirst($faker->word()));
                $picture->addTag($tag);
            }

            for ($k = 1; $k <= random_int(3, 8); $k++) {
                $comment = new Comment();
                $comment->setMessage(ucfirst($faker->paragraph()))
                    ->setCreated($faker->dateTime());
                $randUser = $users[array_rand($users)];
                $randUser->addComment($comment);
                $picture->addComment($comment);
            }

            $likeUsers = $users;
            for ($m = 1;$m <= random_int(0, 10);$m++) {
                $like = new Like();
                $randomUserKey = array_rand($likeUsers);
                $randUserFromLikeUsers = $likeUsers[$randomUserKey];
                $like->setUser($randUserFromLikeUsers);
                $like->setPicture($picture);
                $picture->addLike($like);
                unset($likeUsers[$randomUserKey]);
            }

            $randUser = $users[array_rand($users)];
            $randUser->addPicture($picture);
            $manager->persist($randUser);
            $manager->flush();
            $i++;
        }
    }
}
