from rest_framework import serializers
from .models import Category, Product,Cart,CartItem
from django.contrib.auth.models import User

class CategorySerializer(serializers.ModelSerializer):
    # products = ProductSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):
    # category = CategorySerializer(many=False, read_only=True)
    class Meta:
        model = Product
        fields = '__all__' 
        # example of how to filter fields. remove line 7 __all__ and replace with line 9:
        # fields = ['name','price']



class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset=Product.objects.all(),
        source='product',
        write_only=True,
        required=False,
    )

    product = ProductSerializer(required=False, read_only=True)

    class Meta:
        model = CartItem
        fields = '__all__'




class CartSerializer(serializers.ModelSerializer):
    # Add a custom field for product names
    items = CartItemSerializer(many=True, read_only=True)
    # product_names = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = '__all__'

    # def get_product_names(self, obj):
    #     # Retrieve the product names associated with the cart
    #     product_names = [item.product.name for item in obj.cartitem_set.all()]
    #     return product_names




class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password', 'email', 'first_name', 'last_name')
        extra_kwargs = {'password': {'write_only': True}
                        }

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], password=validated_data['password'], email=validated_data['email'],
                                        first_name=validated_data['first_name'], last_name=validated_data['last_name'])
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
