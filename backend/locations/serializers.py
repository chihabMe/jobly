#!/usr/bin/env python
# -*- coding: utf-8 -*-

from rest_framework import serializers
from .models import Location


class LocationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Location
        fields = ['name', 'number']
