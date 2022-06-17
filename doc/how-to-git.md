# Guia de uso de git

## 0. Nos traemos los últimos cambios

```bash
# Verificamos que no tenemos nada para comitear
git status

# Si habia algo luego de commitear traemos los útimos cambios
git pull

```

## 1. Creamos una nueva rama

```bash
# puede ser feature / hotfix / bug
git checkout -b feature/nombre-branch
```

Esto nos crea un nuevo branch identico al branch desde el que estamos parados y nos deja posicionados en el nuevo branch. Por ejemplo: develop

## 2. Hacer cambios y comitearlos

Trabajamos en nuestro branch y cuando finalizamos:

```bash
# Vemos que cambios hemos realizado
git status 

# Agrego todos los cambios al repo
git add .

# Hago commit rápido
git commit -m "Mi comentario acá"
```

## 3. Dejamos cambios pendientes

Si estamos trabajando en una rama y queremos aplicar dichos cambios en una rama distinta.

```bash
# Agregamos todos los cambios al repo
git add .

# Dejamos los cambios pendientes
git stash

# Nos cambiamos de rama
git branch # vemos las ramas
git checkout feature/rama-a-movernos

# Nos agrega los cambios pendientes en la rama que nos movimos
git stash apply

# ** REPETIMOS AGREGAR Y COMITEAR EL PUNTO 2 **
```

## Subimos los cambios a github

```bash
git push # falla la primera vez ya que no existe la rama

git push --set-upstream origin feature/nombre-de-la-rama

```

## Mergeamos cambios entre ramas

Habiendo comiteado todos los cambios desde la rama de partida

```bash
# Agregamos y comiteamos los cambios en la rama de partida "feature/juan-grupo-x"
git add .
git commit -m "bla bla"

# Nos cambiamos de rama
git checkout grupoX
git merge feature/juan-grupo-x

# Luego subimos los cambios
git push

```

## Borramos una rama

```bash
# Lista las ramas
git branch 

git branch -D feature/xx-nombre-de-rama-a-borrar
```

## Resolución de conflicto

Aparece después de que hacemos un merge

```bash
# Luego de megear vemos estado del repo
git status

# Si hay conflicto lo vemos en ese listado e ingresamos a cada archivo con conflicto

# Arreglamos el conflicto a mano y verficamos que todo quede funcionado

# Agregamos los cambios, comiteamos y subimos

git add .
# -a nos abre el editor por defecto
git commit -a # sino usar -m con mensaje custom
# después de -a solo guardamos y cerramos
git push

```