#!/bin/bash

mv ~/Downloads/$1.svg static/$1.svg
bg=$(sed -nE 's/.*style="background: ([^;]+);".*/\1/p' static/$1.svg)
inkscape --export-png=static/$1.png --export-area-page --export-background="$bg" static/$1.svg
