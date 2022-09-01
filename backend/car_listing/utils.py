import random
from django.utils.text import slugify


def unique_slug(slug_word):
    slug_word += " " + str(random.randint(500, 9999999999))
    slug = slugify(slug_word)
    return slug
