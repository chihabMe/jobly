#!/usr/bin/env python
# -*- coding: utf-8 -*-
from django.core.exceptions import ValidationError


def validate_file_extension(value):
    allowed = ["pdf", "doc"]
    file_type = value.name.split(".")[-1]
    if file_type not in allowed:
        raise ValidationError("please use a pdf or word file")
