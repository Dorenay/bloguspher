<nav class="nav">
    <div class="container-fluid">
        <div class="nav__content">
            <a href="/" class="nav__brand">
                <img src="img/Bloguspher.svg" alt="logo">
            </a>
            <div class="nav__links">
                <?php require('simple-templates/nav-ul.php');?>
            </div>
            <from class="nav__search" id="search-from-header">
                <input type="text" placeholder="Type and hit Enter…">
                <button type="submit" hidden></button>
            </from>
            <button class="nav__controller nav__controller--form" data-target="search-from-header">
                <i class="icon icon--search" data-job="open">
                </i>
                <i class="icon icon--close" data-job="close">
                </i>
            </button>
            <button class="nav__controller">
                <i class="icon icon--burger" data-job="open">
                </i>
                <i class="icon icon--close" data-job="close">
                </i>
            </button>
            <aside class="nav__aside">
                <?php include 'simple-templates/nav-widget.php';?>
            </aside>
        </div>
    </div>
</nav>

