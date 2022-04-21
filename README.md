# Social - share your pictures (WiP)

Creation of a micro photo sharing platform (Instagram-like) with React and ApiPlatform (Symfony 6 base).

**Made for educational purposes.**

I created this application to test the use of Docker in a use case where my work environment does not have the prerequisites to run an application in Symfony 6 (PHP8) and to finally create an API under API Platform.

**Beware**: **Please note, the application is still under development, some parts are missing such as authentication on the Front side and some Back resources are not yet completely secure**

## Environment used during development
* [Symfony 6.0.7](https://symfony.com/doc/current/setup.html)
* [Composer 2.1.12](https://getcomposer.org/doc/00-intro.md)
* Docker
    * Nginx 1.20.2
    * PHP 8.0.13
    * MySQL 5.8
    * Node 13.14.0
## Installation
1- Clone the GitHub repository in the desired folder :
```
    git clone https://github.com/ProfesseurOrme/symf6-social.git
```
2- Go to your project directory and install the project dependencies with the [Composer](https://getcomposer.org/doc/00-intro.md) command  :
```
    composer install
```

3- Configure your environment variables in the file `.env` such as :

* Database url  :
```
    DATABASE_URL=mysql://db.username:db.password@127.0.0.1:3306/db_name
```

4- If the `.env` file is correctly configured, create the database with the command below :
```
    php bin/console doctrine:database:create
```
5- Create the different database tables :
```
    php bin/console doctrine:migrations:migrate
```
6- Install fake datas with fixtures to enhance the API (Here, we will create an administrator access with
"SuperAdmin" as username and "admin123456" as password, don't worry, it won't work in demo website :o)) :
```
    php bin/console doctrine:fixtures:load
```

7- The API is secured by a Token manager. To configure it and generate the keys, enter the commands
following from the root of the project :
```
    php bin/console lexik:jwt:generate-keypair
```

8- Then install the assets of the Front with :
```
    npm run dev
```

You can create a production build with :
```
    npm run build
```

11- Your project is ready to use! To use the application in a local environment, please
inquire about this
[documentation](https://symfony.com/doc/current/setup.html#running-symfony-applications).