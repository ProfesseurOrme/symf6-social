<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use App\Repository\PictureRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: PictureRepository::class)]
#[ApiResource(
    collectionOperations: [
        "get",
        "post" => ["security" => "is_granted('PICTURE_POST', object)"],
    ],
    itemOperations: [
        "get",
        "put" => ["security" => "is_granted('PICTURE_EDIT', object)"],
        "delete" => ["security" => "is_granted('PICTURE_DELETE', object)"],

    ],
    attributes: ["pagination_items_per_page" => 9],
    normalizationContext: ["groups" => ["picture:read"]],
)]
class Picture
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(["picture:read"])]
    private ?int $id;

    #[ORM\Column(type: 'string', length: 255)]
    #[Groups(["picture:read"])]
    private ?string $image;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(["picture:read"])]
    private ?string $description;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: 'pictures')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(["picture:read"])]
    private ?User $user;

    #[ORM\ManyToMany(targetEntity: Tag::class, inversedBy: 'pictures', cascade: ['persist'])]
    #[Groups(["picture:read"])]
    private $tags;

    #[ORM\OneToMany(mappedBy: 'picture', targetEntity: Comment::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(["picture:read"])]
    private $comments;

    #[ORM\OneToMany(mappedBy: 'picture', targetEntity: Like::class, cascade: ['persist'], orphanRemoval: true)]
    #[Groups(["picture:read"])]
    private $likes;

    public function __construct()
    {
        $this->tags = new ArrayCollection();
        $this->comments = new ArrayCollection();
        $this->likes = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(string $image): self
    {
        $this->image = $image;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection<int, Tag>
     */
    public function getTags(): Collection
    {
        return $this->tags;
    }

    public function addTag(Tag $tag): self
    {
        if (!$this->tags->contains($tag)) {
            $this->tags[] = $tag;
        }

        return $this;
    }

    public function removeTag(Tag $tag): self
    {
        $this->tags->removeElement($tag);

        return $this;
    }

    /**
     * @return Collection<int, Comment>
     */
    public function getComments(): Collection
    {
        return $this->comments;
    }

    public function addComment(Comment $comment): self
    {
        if (!$this->comments->contains($comment)) {
            $this->comments[] = $comment;
            $comment->setPicture($this);
        }

        return $this;
    }

    public function removeComment(Comment $comment): self
    {
        if ($this->comments->removeElement($comment)) {
            // set the owning side to null (unless already changed)
            if ($comment->getPicture() === $this) {
                $comment->setPicture(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Like>
     */
    public function getLikes(): Collection
    {
        return $this->likes;
    }

    public function addLike(Like $like): self
    {
        if (!$this->likes->contains($like)) {
            $this->likes[] = $like;
            $like->setPicture($this);
        }

        return $this;
    }

    public function removeLike(Like $like): self
    {
        if ($this->likes->removeElement($like)) {
            // set the owning side to null (unless already changed)
            if ($like->getPicture() === $this) {
                $like->setPicture(null);
            }
        }

        return $this;
    }
}
