#!/bin/bash

if ! [ $# -eq 1 ]; then
  echo "usage:"
  echo "texture_packer.sh パッキング対象ディレクトリのパス(_からはじまる)"
  exit 1
fi

DIR=$1
BASENAME=`basename $DIR`

if [[ ! $BASENAME =~ ^_ ]]; then
  echo "パッキングするディレクトリ名は _ から始まる規則で命名してください"
  exit 1
fi

if [ ! -e $DIR ]; then
  echo "ディレクトリ: ${DIR} は存在しません"
  exit 1
fi

OUTPUT_PATH="${DIR%/*}"

TMP=`echo $BASENAME | sed -e 's/^_//g'`

OUTPUT_JSON_FILE="${TMP}.json"
OUTPUT_JSON_FILE_PATH="${OUTPUT_PATH}/${OUTPUT_JSON_FILE}"

OUTPUT_PNG_FILE="${TMP}.png"
OUTPUT_PNG_FILE_PATH="${OUTPUT_PATH}/${OUTPUT_PNG_FILE}"

echo "パッキング対象ディレクトリ:${DIR}"
echo "出力ファイル: ${OUTPUT_PATH}/${OUTPUT_PNG_FILE}"

CMD="TexturePacker --format pixijs4 --texture-format png8 --force-squared --max-size 2048 --size-constraints POT --scale 5.0 --scale-mode Fast --sheet ${OUTPUT_PNG_FILE_PATH}{v} --data ${OUTPUT_JSON_FILE_PATH} ${DIR}"
#echo ${CMD}
${CMD}

exit 0
