CREATE TABLE `resultsCadillac` (
    `vin` VARCHAR(17) CHARACTER SET utf8 NOT NULL,
    `make` VARCHAR(17) CHARACTER SET utf8,
    `year` INT,
    `dealer` VARCHAR(26) CHARACTER SET utf8,
    `dealerFeaturedPrice` INT,
    `netPrice` INT,
    `msrp` INT,
    `sellingPrice` INT,
    `discounts` INT,
    `driveType` VARCHAR(3) CHARACTER SET utf8,
    `model` VARCHAR(26) CHARACTER SET utf8,
    `color` VARCHAR(30) CHARACTER SET utf8,
    `addedDate` DATE DEFAULT (CURRENT_DATE),
    PRIMARY KEY (`vin`)
);