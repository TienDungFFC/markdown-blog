---
title: Xoá file .DS_Store trong GIT Repo
---

Xoá file .DS_Store đã tồn tại trong repo:

```
find . -name .DS_Store -print0 | xargs -0 git rm -f --ignore-unmatch
```

Ném `.DS_Storre` vào file .gitignore rồi commit lên