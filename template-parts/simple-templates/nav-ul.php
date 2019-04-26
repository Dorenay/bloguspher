<ul class="nav__list">
    <?php foreach ($nav as $key => $item):?>
        <li class="nav__item">
            <div class="nav__stroke">

            </div>
            <a href="/"><?=$key;?></a>
            <button class="drop-down__toggle">
                +
            </button>
            <ul class="nav__sub-menu">
                <?php foreach ($item as $value):?>
                    <li class="menu__item">
                        <a href="/"><?=$value;?></a>
                    </li>
                <?php endforeach;?>
            </ul>
        </li>
    <?php endforeach;?>
</ul>